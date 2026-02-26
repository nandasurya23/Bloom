"use client";

import type { ChangeEvent, JSX } from "react";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { FiUpload, FiX } from "react-icons/fi";

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024;
const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

const avatarFileSchema = z
  .object({
    type: z.string(),
    size: z.number()
  })
  .refine((file) => ACCEPTED_MIME_TYPES.includes(file.type as (typeof ACCEPTED_MIME_TYPES)[number]), {
    message: "Only JPEG, PNG, or WEBP files are allowed"
  })
  .refine((file) => file.size <= MAX_FILE_SIZE_BYTES, {
    message: "Image size must be 2MB or less"
  });

type AvatarUploadProps = {
  currentAvatar?: string;
  onSave: (base64: string) => void;
};

export function AvatarUpload({ currentAvatar, onSave }: AvatarUploadProps): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(currentAvatar ?? "");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!selectedFile) {
      setPreview(currentAvatar ?? "");
    }
  }, [currentAvatar, selectedFile]);

  const placeholderInitial = useMemo<string>(() => {
    return "B";
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const parsed = avatarFileSchema.safeParse({
      type: file.type,
      size: file.size
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid file");
      setSelectedFile(null);
      return;
    }

    setError("");
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (): void => {
    if (!selectedFile || !preview) {
      return;
    }

    onSave(preview);
    setSelectedFile(null);
    setError("");
  };

  const handleCancel = (): void => {
    setSelectedFile(null);
    setPreview(currentAvatar ?? "");
    setError("");
  };

  return (
    <div className="flex items-start gap-4">
      {/* Avatar Preview */}
      <div className="relative">
        <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-bloom-rose/20 bg-bloom-blush">
          {preview ? (
            <Image 
              src={preview} 
              alt="Avatar" 
              fill 
              unoptimized 
              sizes="64px" 
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-medium text-bloom-ink">
              {placeholderInitial}
            </div>
          )}
        </div>
      </div>

      {/* Upload Controls */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {/* Hidden File Input */}
          <input
            type="file"
            id="avatar-upload"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
          
          {/* Upload Button */}
          <label
            htmlFor="avatar-upload"
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-bloom-rose/30 bg-white px-3 py-1.5 text-xs text-bloom-ink transition-colors hover:bg-bloom-rose/5"
          >
            <FiUpload className="h-3 w-3" />
            {selectedFile ? 'Change photo' : 'Upload photo'}
          </label>

          {/* Action Buttons */}
          {selectedFile && (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-lg bg-bloom-rose px-3 py-1.5 text-xs text-white transition-colors hover:bg-bloom-rose/90"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg border border-bloom-rose/30 bg-white px-3 py-1.5 text-xs text-bloom-ink transition-colors hover:bg-bloom-rose/5"
              >
                <FiX className="h-3 w-3" />
              </button>
            </>
          )}
        </div>

        {/* File Name & Error */}
        {selectedFile && (
          <p className="mt-1 text-xs text-bloom-ink/40">
            {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
          </p>
        )}
        
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}

        {/* Helper Text */}
        <p className="mt-1 text-xs text-bloom-ink/30">
          JPEG, PNG, WEBP (max 2MB)
        </p>
      </div>
    </div>
  );
}
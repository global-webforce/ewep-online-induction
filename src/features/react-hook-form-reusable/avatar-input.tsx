import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ComponentPropsWithoutRef, ReactNode, useState } from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { ImageUpload } from "./image-input";

type FileInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<ControllerProps<TFieldValues, TName>, "name" | "control" | "rules"> &
  ComponentPropsWithoutRef<"input"> & {
    label?: string | ReactNode;
    url?: string | null;
  };

export function AvatarInput<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>
>({ url, label, name, control, rules, ...rest }: FileInputProps<T, U>) {
  const fallBackImage = "/avatar.jpg";
  const [fileUrl, setFileUrl] = useState<string>(url ?? fallBackImage);

  return (
    <FormField
      control={control}
      name={name}
      key={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="space-y-1 leading-none">
            {typeof label === "string"
              ? label.charAt(0).toUpperCase() + label.slice(1)
              : name.charAt(0).toUpperCase() + name.slice(1)}
          </FormLabel>

          <FormControl>
            <ImageUpload
              onChange={(uploadedFile) => {
                const newImageURL = URL.createObjectURL(uploadedFile!);
                setFileUrl(newImageURL);
                field.onChange(uploadedFile);
              }}
              size={150}
              enforceSquare={true}
              placeholder={url || fallBackImage}
            />
            {/*  <Avatar
              onError={() => fallBackImage}
              key={fileUrl}
              emptyLabel=""
              label="mamaloan"
              loadingLabel=""
              changeLabel=""
              onChange={(uploadedFile) => {
                const newImageURL = URL.createObjectURL(uploadedFile);
                setFileUrl(newImageURL);
                field.onChange(uploadedFile);
              }}
              src={fileUrl}
              style={{
                width: "150px",
                height: "150px",
                background: "grey",
                objectFit: "cover",
              }}
            /> */}
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

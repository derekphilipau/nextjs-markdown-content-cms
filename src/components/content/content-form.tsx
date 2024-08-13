"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import type { Content } from "@/types";
import { Container } from "../layout/container";

interface ContentFormProps {
  content: Content;
}

export function ContentForm({ content }: ContentFormProps) {
  const FormComponent = content.form
    ? dynamic(
        () =>
          import(`@/components/forms/${content.form}.tsx`).then(
            (mod) => mod.default || mod
          ),
        {
          ssr: false,
          loading: () => <div>Loading form...</div>,
        }
      )
    : null;

  if (!FormComponent) {
    return <div>No form component specified</div>;
  }

  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <Container>
        <FormComponent />
      </Container>
    </Suspense>
  );
}

"use client";

import React from "react";
import config from "@/lib/config";
import { IKImage } from "imagekitio-next";

const StudentId = ({ universityCard }: { universityCard: string }) => {
  return (
    <IKImage
      className="rounded-md"
      path={universityCard}
      urlEndpoint={config.env.imagekit.urlEndpoint}
      alt="student id card"
    />
  );
};
export default StudentId;

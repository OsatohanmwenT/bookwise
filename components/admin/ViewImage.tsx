"use client";

import React from "react";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";

const ViewImage = ({ path }: { path: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="view">
          <span>View ID Card</span>
          <ExternalLink className="size-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="p-8 py-12 flex items-center justify-center">
        <IKImage
          urlEndpoint={config.env.imagekit.urlEndpoint}
          path={path}
          alt={path}
          loading="lazy"
        />
      </DialogContent>
    </Dialog>
  );
};
export default ViewImage;

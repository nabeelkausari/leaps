import React, { Fragment } from "react";
import ReactPlayer from "react-player";

export const MaterialDocument = ({ document }) => (
  <div className="learn-content-modal">
    {document.title && (
      <Fragment>
        {document.type.toLocaleLowerCase() === "pdf" && (
          <object
            data={document._links.download.href}
            type="application/pdf"
            width="100%"
            className="material-doc"
          >
            <p>
              Your web browser doesn't have a PDF plugin. Instead you can{" "}
              <a href={document._links.download.href}>
                click here to download the PDF file.
              </a>
            </p>
          </object>
        )}
        {document.type.toLocaleLowerCase() === "video" && (
          //ReactPlayer url={document._links.download.href} playing />
          <video width="100%" controls>
            <source src={document._links.download.href} />
            Your browser does not support the video tag.
          </video>
        )}
        {document.type.toLocaleLowerCase() === "audio" && (
          <audio controls>
            <source src={document._links.download.href} />
            Your browser does not support the audio tag.
          </audio>
        )}
        {document.type.toLocaleLowerCase() === "image" && (
          <img src={document._links.download.href} />
        )}
        {document.type.toLocaleLowerCase() !== "pdf" &&
          document.type.toLocaleLowerCase() !== "video" &&
          document.type.toLocaleLowerCase() !== "image" &&
          document.type.toLocaleLowerCase() !== "audio" && (
            <a href={document._links.download.href}>Click to Download</a>
          )}
      </Fragment>
    )}
  </div>
);

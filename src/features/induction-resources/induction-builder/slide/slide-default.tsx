import React from "react";
import SlideItem from "./slide";
import Thumbnail from "./thumbnail";
import { randomId, stripHtml } from "../utils";
import ActionBar from "./action-bar";
import CopyButton from "./copy-button";
import DeleteButton from "./delete-button";
import MoveButton from "./move-button";
import QuizFlag from "./quiz-flag";
import slide from "./slide";

export default function SlideDefault() {
  return (
    <>
      <SlideItem key={randomId()} isActive={true} onClick={() => {}}>
        <Thumbnail>
          <h1 className="font-semibold "></h1>
          <p className="text-sm text-muted-foreground truncate max-w-[250px]"></p>
        </Thumbnail>
        <ActionBar isActive={true}>
          <div className="flex items-center  m-2 text-white gap-2">
            <span>1</span>
          </div>

          <div className="flex justify-end space-x-2"></div>
        </ActionBar>
      </SlideItem>
    </>
  );
}

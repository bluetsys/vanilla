/**
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import { StoryHeading } from "@library/storybook/StoryHeading";
import { storiesOf } from "@storybook/react";
import React from "react";
import { StoryTiles } from "@library/storybook/StoryTiles";
import Button from "@library/forms/Button";
import { StoryTileAndTextCompact } from "@library/storybook/StoryTileAndTextCompact";
import { ButtonTypes, buttonUtilityClasses } from "@library/forms/buttonStyles";
import { ComposeIcon } from "@library/icons/titleBar";
import { globalVariables } from "@library/styles/globalStyleVars";
import { StoryContent } from "@library/storybook/StoryContent";
import { StoryParagraph } from "@library/storybook/StoryParagraph";
import { StoryExampleModalConfirm } from "./StoryExampleModalConfirm";

const reactionsStory = storiesOf("Components", module);

reactionsStory.add("Buttons", () => {
    const globalVars = globalVariables();
    const classes = buttonUtilityClasses();
    return (
        <>
            <StoryHeading depth={1}>Buttons</StoryHeading>
            <StoryTiles>
                <>
                    <StoryTileAndTextCompact>
                        <Button baseClass={ButtonTypes.STANDARD}>Standard</Button>
                    </StoryTileAndTextCompact>
                    <StoryTileAndTextCompact>
                        <Button baseClass={ButtonTypes.PRIMARY}>Primary</Button>
                    </StoryTileAndTextCompact>
                    <StoryTileAndTextCompact text={"Mostly for modal footer"}>
                        <Button baseClass={ButtonTypes.TEXT}>Text</Button>
                    </StoryTileAndTextCompact>
                    <StoryTileAndTextCompact text={"Mostly for modal footer call to action"}>
                        <Button baseClass={ButtonTypes.TEXT_PRIMARY}>Text Primary</Button>
                    </StoryTileAndTextCompact>
                    <StoryTileAndTextCompact
                        text={`Standard icon button - ${globalVars.buttonIcon.size} x ${
                            globalVars.buttonIcon.size
                        } pixels`}
                    >
                        <Button baseClass={ButtonTypes.ICON}>
                            <ComposeIcon />
                        </Button>
                    </StoryTileAndTextCompact>
                    <StoryTileAndTextCompact
                        text={`Compact icon button - ${globalVars.icon.sizes.default} x ${
                            globalVars.icon.sizes.default
                        } pixels`}
                    >
                        <Button baseClass={ButtonTypes.ICON_COMPACT}>
                            <ComposeIcon />
                        </Button>
                    </StoryTileAndTextCompact>

                    <StoryTileAndTextCompact type={"titleBar"} text={"For TitleBar call to action (login)"}>
                        <Button baseClass={ButtonTypes.TRANSPARENT}>Transparent</Button>
                    </StoryTileAndTextCompact>

                    <StoryTileAndTextCompact type={"titleBar"} text={"For TitleBar call to action (register)"}>
                        <Button baseClass={ButtonTypes.TRANSLUCID}>Translucid</Button>
                    </StoryTileAndTextCompact>
                    <StoryTileAndTextCompact
                        text={
                            "Only basic styles applied so you can customize your own without fighting existing styles. Use sparingly"
                        }
                    >
                        <Button baseClass={ButtonTypes.CUSTOM}>Custom</Button>
                    </StoryTileAndTextCompact>

                    <StoryHeading>Icon with text</StoryHeading>
                    <Button baseClass={ButtonTypes.PRIMARY}>
                        <>
                            <ComposeIcon />
                            <span className={classes.buttonIconLeftMargin}>Example with icon</span>
                        </>
                    </Button>
                </>
            </StoryTiles>
        </>
    );
});

reactionsStory.add("Modals", () => {
    return (
        <StoryContent>
            <StoryHeading depth={1}>Modals</StoryHeading>
            <StoryParagraph>
                Click button to see modals. The modal &quot;open&quot; state is handled by its parent. Note that they
                are rendered through a{" "}
                <a href="https://reactjs.org/docs/portals.html" rel="noopener noreferrer" target="_blank">
                    react portal
                </a>
                .
            </StoryParagraph>

            <StoryTiles>
                <StoryExampleModalConfirm />

                {/*<StoryModalExample buttonText={"Standard Modal"}>*/}
                {/*    <Modal label={"Hi"} size={ModalSizes.SMALL}>*/}
                {/*        {"Note that confirmation won't work here. You must cancel."}*/}
                {/*    </Modal>*/}
                {/*</StoryModalExample>*/}
            </StoryTiles>
        </StoryContent>
    );
});

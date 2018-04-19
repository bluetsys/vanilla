/**
 * @author Adam (charrondev) Charron <adam.c@vanillaforums.com>
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license https://opensource.org/licenses/GPL-2.0 GPL-2.0
 */

import uniqueId from "lodash/uniqueId";
import * as PropTypes from "prop-types";
import Quill from "quill/core";
import React from "react";

export const editorContextTypes = {
    quill: PropTypes.object,
    editorID: PropTypes.string,
};

interface IProps {
    quill: Quill;
}

type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export interface IEditorContextProps {
    quill?: Quill;
    editorID?: string;
}

export default class EditorContextProvider extends React.PureComponent<IProps> {
    public static childContextTypes = editorContextTypes;

    public getChildContext() {
        return {
            quill: this.props.quill,
            editorID: "richEditor" + uniqueId(),
        };
    }

    public render() {
        return <div>{this.props.children}</div>;
    }
}

/**
 * Map a quill context to props.
 *
 * @param {React.Component} Component - The component to map.
 *
 * @returns {ComponentWithEditor} - A component with a quill context injected as props.
 */
export function withEditor<T extends IEditorContextProps>(
    Component: React.ComponentClass<T>,
): React.ComponentClass<Omit<T, keyof IProps>> {
    function ComponentWithEditor(props, context) {
        return <Component {...context} {...props} />;
    }
    (ComponentWithEditor as any).contextTypes = editorContextTypes;

    return ComponentWithEditor as any;
}

// Type definitions for draft-js-plugins-editor 2.0.0-rc8
// Project: https://github.com/draft-js-plugins/draft-js-plugins/tree/master/draft-js-plugins-editor
// Definitions by: IronLu233 <https://github.com/IronLu233>

import * as React from 'react';
import * as Draft from 'draft-js';
import * as Immutable from 'immutable';

type SyntheticKeyboardEvent = React.KeyboardEvent<{}>;
type SyntheticEvent = React.SyntheticEvent<{}>;
type GetEditorStateFn = () => Draft.EditorState;
type SetEditorStateFn = (editorState: Draft.EditorState) => any;
type DraftBlockRenderMap = Immutable.Map<Draft.DraftBlockType, DraftBlockRenderConfig>;

export as namespace DraftJsPlugins;

export interface PluginFunctions {
  getPlugins(): [Plugin],
  getProps(): DraftPluginEditorProps,
  setEditorState: SetEditorStateFn,
  getEditorState: GetEditorStateFn,
  getReadOnly(): boolean,
  setReadOnly(readonly: boolean): any,
  getEditorRef(): Draft.Editor
}

interface WillUnmountArguments {
  setEditorState: SetEditorStateFn,
  getEditorState: GetEditorStateFn,
}

export interface Plugin {
  initialize?(pluginFunctions: PluginFunctions): any,
  willUnmount?(args: WillUnmountArguments): any,
  onChange?(editorState: Draft.EditorState): Draft.EditorState,
  decorators?: [DraftPluginDecorator]
  defaultKeyBindings?: boolean,

  handleReturn?(e: SyntheticKeyboardEvent, editorState: Draft.EditorState): Draft.DraftHandleValue,
  handleKeyCommand?(command: Draft.DraftEditorCommand, editorState: Draft.EditorState): Draft.DraftHandleValue,
  handleBeforeInput?(chars: string, editorState: Draft.EditorState): Draft.DraftHandleValue,
  handlePastedText?(text: string, html: string|undefined, editorState: Draft.EditorState): Draft.DraftHandleValue,
  handlePastedFiles?(files: Array<Blob>): Draft.DraftHandleValue,
  handleDroppedFiles?(selection: Draft.SelectionState, files: Array<Blob>): Draft.DraftHandleValue,
  handleDrop?(selection: Draft.SelectionState, dataTransfer: Object, isInternal: Draft.DraftDragType): Draft.DraftHandleValue,

  onEscape?(e: SyntheticKeyboardEvent): void;
  onTab?(e: SyntheticKeyboardEvent): void;
  onUpArrow?(e: SyntheticKeyboardEvent): void;
  onDownArrow?(e: SyntheticKeyboardEvent): void;

  blockRendererFn?(block: Draft.ContentBlock): any;
  blockStyleFn?(block: Draft.ContentBlock): string;
  keyBindingFn?(e: SyntheticKeyboardEvent): Draft.DraftEditorCommand | null;

  blockRenderMap?: DraftBlockRenderMap;
  customStyleMap?: any;

  getAccessibilityProps(): object;
}

interface DraftPluginDecorator {
  strategy: (block: Draft.ContentBlock, callback: (start: number, end: number) => void, contentState: Draft.ContentState) => void;
  component: Function;
  props?: Object;
}

export interface DraftPluginEditorProps extends Draft.EditorProps {
  editorState: Draft.EditorState,
  defaultKeyBindings?: boolean,
  defaultBlockRenderMap?: boolean,
  customStyleMap?: object,
  decorators?: [DraftPluginDecorator]
  plugins?: [Plugin],
}

export class Editor extends React.Component<DraftPluginEditorProps, {}> {
  focus(): void;
  blur(): void;
}
interface DraftBlockRenderConfig {
  element: string;
  wrapper?: React.ReactElement<any>;
}

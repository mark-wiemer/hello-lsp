/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as vscode from 'vscode';
import * as path from 'path';

export let doc: vscode.TextDocument;
export let editor: vscode.TextEditor;
export let documentEol: string;
export let platformEol: string;

/** `publisher.name` from package.json */
export const extensionId = 'mark-wiemer.hello-lsp';

/** Activates the vscode.lsp-sample extension */
export async function activate(docUri: vscode.Uri): Promise<void> {
    const ext = vscode.extensions.getExtension(extensionId)!;
    await ext.activate();
    try {
        doc = await vscode.workspace.openTextDocument(docUri);
        editor = await vscode.window.showTextDocument(doc);
        await sleep(2000); // Wait for server activation
    } catch (e) {
        console.error(e);
    }
}

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const getDocPath = (p: string): string => {
    return path.resolve(__dirname, '../../testFixture', p);
};

/** Returns the vscode.Uri for the provided filename within the testFixture folder */
export const getDocUri = (p: string): vscode.Uri => {
    return vscode.Uri.file(getDocPath(p));
};

/** Replaces the content of the current file with the provided `content` string */
export async function setTestContent(content: string): Promise<boolean> {
    const all = new vscode.Range(
        doc.positionAt(0),
        doc.positionAt(doc.getText().length),
    );
    return editor.edit((eb) => eb.replace(all, content));
}

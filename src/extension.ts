// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "copy-to-notion-formula" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('copy-to-notion-formula.copyToNotionFormula', () => {

		// Check if there's a selection
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No editor is active.');
			return;
		}

		const selection = editor.selection;
		if (selection.isEmpty) {
			vscode.window.showInformationMessage('Please make a selection first.');
			return;
		}

		// Get the selected text, and copy it to the clipboard using the following regular expression to format it:
		// /([\n\t][ ]{2,}|[\n\t]|[/]{2}[^\n\t]*)/g -> Matches new lines, tabs, spaces, comments
		const selectedText = editor.document.getText(selection);
		const formattedText = selectedText.replace(/([\n\t][ ]{2,}|[\n\t]|[/]{2}[^\n\t]*)/g, '').trim();
		vscode.env.clipboard.writeText(formattedText);
		vscode.window.showInformationMessage('Copied to clipboard!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

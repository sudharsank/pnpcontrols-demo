import * as React from 'react';
import { FC, useState } from 'react';
import styles from './FilePickerDemo.module.scss';
import { IFilePickerDemoProps } from './IFilePickerDemoProps';
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';
import { FileTypeIcon, ApplicationType, IconType, ImageSize } from "@pnp/spfx-controls-react/lib/FileTypeIcon";

const filePickerDemo: FC<IFilePickerDemoProps> = (props) => {
    const {
        description,
        isDarkTheme,
        environmentMessage,
        hasTeamsContext,
        userDisplayName
    } = props;
    const [selFiles, setSelFiles] = useState<any[]>([]);
    const onFilePickerSave = async (filePickerResult: IFilePickerResult[]) => {
        if (filePickerResult && filePickerResult.length > 0) {
            let selfiles: any[] = [];
            for (var i = 0; i < filePickerResult.length; i++) {
                const item = filePickerResult[i];
                console.log("File Info: ", item);
                selfiles.push({
                    Name: item.fileName
                });
                const fileResultContent = await item.downloadFileContent();
                console.log(fileResultContent);
            }
            setSelFiles(selfiles);
        }
    };
    React.useEffect(() => {
        console.log("Selected Files: ", selFiles);
    }, [selFiles]);
    return (
        <section className={`${styles.filePickerDemo} ${hasTeamsContext ? styles.teams : ''}`}>
            <FilePicker
                bingAPIKey="<BING API KEY>"
                //accepts={[".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"]}
                buttonIcon="FileImage"
                buttonLabel='Select File(s)'
                onSave={onFilePickerSave}
                onChange={(filePickerResult: IFilePickerResult[]) => { console.log(filePickerResult); }}
                context={props.context as any}
                hideLocalMultipleUploadTab={false}
            />
            {selFiles && selFiles.length > 0 &&
                <div><b>Selected File Info:</b>
                    <>
                        {selFiles.map(file => {
                            return (<div>Filename: <FileTypeIcon type={IconType.font} path={file.Name} size={ImageSize.medium}></FileTypeIcon> {file.Name}</div>)
                        })}
                    </>
                </div>

            }

        </section>
    );
};

export default filePickerDemo;

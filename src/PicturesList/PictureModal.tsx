import { FunctionComponent, memo, useRef } from 'react';
import { DownloadIcon } from '~common/icons';
import Modal, { CloseModalButton, ModalProps } from '~common/Modal';
import Button from '~common/Button';
import MediaCard from '~common/MediaCard';
import useOnline from '~common/useOnline';
import useImageBlob from '~common/useImageBlob';
import classNames from 'classnames';

import { Picture } from './Picture';
import { getPictureProps } from './pictureUtils';

export interface PictureModal extends ModalProps {
  readonly picture: Picture | undefined;
  readonly loadedSrc: string | undefined;
}

export const PictureModal: FunctionComponent<PictureModal> = memo(
  ({ picture, loadedSrc, style, className, onClose, ...props }) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const pictureProps = picture && getPictureProps(picture);
    const { data: imageBlob, isError } = useImageBlob(pictureProps?.src);
    const online = useOnline();
    const modalStyle = picture
      ? {
          ...style,
          maxHeight: `min(calc(100% - 3vh), ${picture.height}px)`,
          maxWidth: `min(calc(100% - 3vw), ${picture.width}px)`,
          aspectRatio: `${picture.width}/${picture.height}`,
        }
      : style;

    return (
      <Modal
        {...props}
        onClose={onClose}
        className={classNames('rounded-2xl m-auto bg-black overflow-hidden', className)}
        style={modalStyle}
      >
        {picture && (
          <MediaCard
            className="mx-auto"
            title={picture.author}
            loadFailed={!loadedSrc && isError}
            loading={
              loadedSrc && <img {...pictureProps} src={loadedSrc} className="text-transparent blur-sm" aria-hidden />
            }
            buttons={
              <>
                <Button
                  as="a"
                  download={picture.author}
                  href={imageBlob}
                  disabled={!imageBlob}
                  aria-label="Download image"
                >
                  <DownloadIcon className="w-6" />
                  Download
                </Button>
                <CloseModalButton>Close</CloseModalButton>
              </>
            }
          >
            <img
              key={`${online}`}
              {...pictureProps}
              src={imageBlob!}
              ref={imageRef}
              className={classNames('text-transparent', {
                /*tw*/ 'absolute top-0': loadedSrc,
                /*tw*/ invisible: !imageBlob,
              })}
            />
          </MediaCard>
        )}
      </Modal>
    );
  },
);

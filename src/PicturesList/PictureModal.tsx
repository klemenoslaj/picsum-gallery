import { FunctionComponent, useState } from 'react';
import { DownloadIcon } from '~common/icons';
import Modal, { CloseModalButton, ModalProps } from '~common/Modal';
import Button from '~common/Button';
import MediaCard from '~common/MediaCard';
import classNames from 'classnames';

import { Picture } from './Picture';
import { getPictureDownloadURL, getPictureProps } from './pictureUtils';

export interface PictureModal extends ModalProps {
  readonly picture: Picture | null;
}

export const PictureModal: FunctionComponent<PictureModal> = ({ picture, style, className, onClose, ...props }) => {
  const [loadFailed, setLoadFailed] = useState(false);
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
      className={classNames('rounded-2xl m-auto bg-black', className)}
      style={modalStyle}
    >
      {picture && (
        <MediaCard
          className="mx-auto"
          title={picture.author}
          loadFailed={loadFailed}
          buttons={
            <>
              <Button as="a" download href={getPictureDownloadURL(picture)} aria-label="Download image">
                <DownloadIcon className="w-6" />
                Download
              </Button>
              <CloseModalButton>Close</CloseModalButton>
            </>
          }
        >
          <img {...getPictureProps(picture)} className="text-transparent" onError={() => setLoadFailed(true)} />
        </MediaCard>
      )}
    </Modal>
  );
};

import { Modal, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { ResCocktail } from '../../lib/res.types';
import { noneScrollPush } from '../../lib/utils';
import CocktailView from './cocktailView';

interface Props {
  cocktail?: ResCocktail;
  state: [boolean, Dispatch<SetStateAction<boolean>>];
}

function CocktailViewModal({
  cocktail,
  state: [isModalOpened, setIsModalOpened],
}: Props) {
  const theme = useMantineTheme();

  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  const router = useRouter();
  const pathIsOpened = router.asPath.includes('modal');

  useEffect(() => {
    if (isModalOpened !== pathIsOpened)
      noneScrollPush(`/${isModalOpened ? '?modal' : ''}`, router);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpened]);

  useEffect(() => {
    if (!pathIsOpened) setIsModalOpened(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathIsOpened]);

  return (
    <Modal
      centered
      opened={isModalOpened}
      onClose={() => setIsModalOpened(false)}
      title={cocktail?.cocktail_name}
      fullScreen={isMobile}
    >
      {cocktail && <CocktailView cocktail={cocktail} />}
    </Modal>
  );
}

export default CocktailViewModal;

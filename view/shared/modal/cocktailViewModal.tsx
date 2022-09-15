import { Modal, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { ResCocktail } from '../../../lib/res.types';
import CocktailView from '../cocktailView';

interface Props {
  cocktail?: ResCocktail;
}

function CocktailViewModal({ cocktail }: Props) {
  const theme = useMantineTheme();

  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  const router = useRouter();
  const isOpened = router.asPath.includes('modal');

  return (
    <Modal
      centered
      opened={isOpened && !!cocktail}
      onClose={() => router.push('/')}
      title={cocktail?.cocktail_name}
      fullScreen={isMobile}
      styles={{
        modal: {
          position: 'relative',
        },
      }}
    >
      {cocktail && <CocktailView cocktail={cocktail} />}
    </Modal>
  );
}

export default CocktailViewModal;

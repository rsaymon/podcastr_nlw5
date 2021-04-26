import { useContext } from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';
import styles from './styles.module.scss';
import PlayerContext from '../../contexts/PlayerContext';

import 'rc-slider/assets/index.css';

export default function Player() {
  const { episodeList, currentEpisodeIndex } = useContext(PlayerContext);
  const episode = episodeList[currentEpisodeIndex];

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir!</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>00:00</span>
        </div>

        {episode && <audio src={episode.url} autoPlay />}

        {/* parei em 0:57:15 */}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Aleatório" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Anterior" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="play.svg" alt="Tocar" className={styles.playButton} />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Próxima" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}

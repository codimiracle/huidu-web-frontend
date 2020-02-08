import React, { RefObject } from 'react';
import { Icon, Progress, Slider, Button } from 'antd';

export enum PlayerStatus {
  playing,
  paused
}

export interface AudioPlayerViewProps {
  src: string,
};
export interface AudioPlayerViewState {
  status: PlayerStatus,
  duration: number,
  played: number,
  selecting: boolean,
  selectedPos: number,
};

export default class AudioPlayerView extends React.Component<AudioPlayerViewProps, AudioPlayerViewState> {
  private audioElementRef: RefObject<HTMLAudioElement>;
  private timer: any;
  constructor(props: AudioPlayerViewProps) {
    super(props);
    this.state = {
      status: PlayerStatus.paused,
      duration: NaN,
      played: 0,
      selecting: false,
      selectedPos: 0

    }
    this.audioElementRef = React.createRef<HTMLAudioElement>();
  }
  play() {
    this.audioElementRef.current.play();
    this.setState({ status: PlayerStatus.playing });
  }
  pause() {
    this.audioElementRef.current.pause();
    this.setState({ status: PlayerStatus.paused });
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  componentDidMount() {
    this.audioElementRef.current.addEventListener('loadstart', () => {
      this.setState({ status: PlayerStatus.paused });
    })
    this.audioElementRef.current.addEventListener('loadeddata', () => {
      this.setState({ duration: this.audioElementRef.current.duration });
    });
    this.audioElementRef.current.addEventListener('play', () => {
      this.setState({ duration: this.audioElementRef.current.duration });
    });
    this.audioElementRef.current.addEventListener('pause', () => {
      this.setState({ status: PlayerStatus.paused });
    });
    this.audioElementRef.current.addEventListener('play', () => {
      this.setState({ status: PlayerStatus.playing });
    });
    this.audioElementRef.current.addEventListener('timeupdate', () => {
      this.setState({ played: this.audioElementRef.current.currentTime });
    })
  }
  onPositionChange() {
    this.setState({ selecting: false });
    this.audioElementRef.current.currentTime = this.state.selectedPos;
  }
  private format(n: number): string {
    if (Number.isNaN(n)) {
      return '--';
    }
    let i = Math.trunc(n);
    if (i < 10) {
      return `0${i}`;
    }
    return `${i}`;
  }
  render() {
    const { src } = this.props;
    const { status, played, duration, selectedPos, selecting } = this.state;
    let pos = selecting ? selectedPos : played;
    return (
      <div className="audio-player-view">
        <div className="action">
          {
            status == PlayerStatus.paused &&
            <Button shape="circle" type="primary" icon="caret-right" onClick={() => this.play()} style={{ display: 'block' }} />
          }
          {
            status == PlayerStatus.playing &&
            <Button shape="circle" icon="pause" onClick={() => this.pause()} style={{ display: 'block' }} />
          }
        </div>
        <div className="progress">
          <div className="time">{this.format(played / 60)}:{this.format(played % 60)}/{this.format(duration / 60)}:{this.format(duration % 60)}</div>
          <Slider
            tipFormatter={(value) => `${this.format(value / 60)}:${this.format(value % 60)}`}
            min={0}
            value={pos}
            max={duration}
            onChange={(value) => this.setState({ selecting: true, selectedPos: parseInt(value.toString()) })}
            onAfterChange={(value) => this.onPositionChange()}
          />
        </div>
        <audio ref={this.audioElementRef} src={src} />
        <style jsx>{`
          .audio-player-view {
            height: 72px;
            display: flex;
            background-color: white;
            padding: 16px;

            align-items: center;
            border-top-left-radius: 64px;
            border-bottom-left-radius: 64px;
            border: 1px solid #dcdcdc;
            border-right: none;
          }
          .action {
            font-size: 2.5em;
          }
          .progress {
            padding-left: 0.5em;
            display: block;
          }
        `}</style>
      </div>
    )
  }
}
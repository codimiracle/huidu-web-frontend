import React, { RefObject, CSSProperties } from 'react';
import { Icon, Progress, Slider, Button, message } from 'antd';

export enum PlayerStatus {
  playing,
  paused
}

export interface AudioPlayerViewProps {
  src: string;
  progress: number;
  onProgress?: (progress: number) => void;
  onLoaded?: (src: string, duration: number) => void;
  onError: (e) => void;
  style?: CSSProperties;
};
export interface AudioPlayerViewState {
  status: PlayerStatus;
  duration: number;
  played: number;
  selecting: boolean;
  selectedPos: number;
  startProgress: number;
};

export default class AudioPlayerView extends React.Component<AudioPlayerViewProps, AudioPlayerViewState> {
  private audioElementRef: RefObject<HTMLAudioElement>;
  constructor(props: AudioPlayerViewProps) {
    super(props);
    this.state = {
      status: PlayerStatus.paused,
      duration: 0,
      played: 0,
      selecting: false,
      selectedPos: 0,
      startProgress: 0.0
    }
    this.audioElementRef = React.createRef<HTMLAudioElement>();
    this.onPlaying = this.onPlaying.bind(this);
    this.onLoaded = this.onLoaded.bind(this);
    this.onPaused = this.onPaused.bind(this);
  }
  play() {
    if (this.props.src) {
      this.audioElementRef.current.play();
      this.setState({ status: PlayerStatus.playing });
    } else {
      message.error('音频源无效');
    }
  }
  pause() {
    this.audioElementRef.current.pause();
    this.setState({ status: PlayerStatus.paused });
  }

  onPlaying() {
    this.props.onProgress && this.props.onProgress(Math.trunc(this.audioElementRef.current.currentTime / this.audioElementRef.current.duration * 10000) / 100);
    this.setState({ played: this.audioElementRef.current.currentTime, duration: this.audioElementRef.current.duration });
  }
  onPaused() {
    this.setState({ status: PlayerStatus.paused });
  }
  onLoaded() {
    this.setState({ status: this.audioElementRef.current.paused ? PlayerStatus.paused : PlayerStatus.playing, duration: this.audioElementRef.current.duration }, () => {
      this.props.onLoaded && this.props.onLoaded(this.props.src, this.state.duration);
    });
  }
  componentWillUnmount() {
    this.audioElementRef.current.removeEventListener('load', this.onLoaded);
    this.audioElementRef.current.removeEventListener('loaddata', this.onLoaded);
    this.audioElementRef.current.removeEventListener('play', this.onPlaying);
    this.audioElementRef.current.removeEventListener('paused', this.onPaused);
    this.audioElementRef.current.removeEventListener('timeupdate', this.onPlaying);
  }
  componentDidMount() {
    this.audioElementRef.current.addEventListener('load', this.onLoaded)
    this.audioElementRef.current.addEventListener('loadeddata', this.onLoaded);
    this.audioElementRef.current.addEventListener('play', this.onPlaying);
    this.audioElementRef.current.addEventListener('pause', this.onPaused);
    this.audioElementRef.current.addEventListener('timeupdate', this.onPlaying);
  }
  componentDidUpdate() {
    if (this.props.progress && this.props.progress - this.state.startProgress > 1) {
      this.setState({ startProgress: this.props.progress });
      let setter = () => {
        this.audioElementRef.current.currentTime = this.audioElementRef.current.duration * this.props.progress;
        this.audioElementRef.current.removeEventListener('canplay', setter);
      }
      this.audioElementRef.current.addEventListener('canplay', setter);
    }
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
      <div className="audio-player-view" style={this.props.style}>
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
            style={{ margin: '0' }}
          />
        </div>
        <audio ref={this.audioElementRef} src={src} onError={this.props.onError} />
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
            flex: 1;
            padding-left: 1em;
            display: block;
          }
        `}</style>
      </div>
    )
  }
}
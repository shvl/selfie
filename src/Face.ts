import { FaceLandmarks68 } from 'face-api.js';
import { getDistance } from './utils/getDistance';
import { FaceDirection } from './FaceDirection';
import { Size } from './types/Size';
import { Point } from './types/Point';

export class Face {
  direction: FaceDirection;
  private frame: Size;
  private left: Point;
  private right: Point;
  private nose: Point;
  private bottom: Point;
  private betweenEyes: Point;

  constructor(landmarks: FaceLandmarks68, frame: Size) {
    // @ts-ignore
    const landmarksPositions = landmarks._positions;
    this.left = landmarksPositions[3];
    this.right = landmarksPositions[15];
    this.nose = landmarksPositions[33];
    this.bottom = landmarksPositions[9];
    this.betweenEyes = landmarksPositions[28];
    this.direction = new FaceDirection(landmarks);
    this.frame = frame;
  }

  getFacePosiotion() {
    return Math.sqrt(
      Math.pow(this.frame.width / 2 - this.nose.x, 2) + Math.pow(this.frame.height / 2 - this.nose.y, 2)
    );
  }

  getWidth() {
    return getDistance(this.left, this.right);
  }

  getHeight() {
    return getDistance(this.betweenEyes, this.bottom);
  }
}
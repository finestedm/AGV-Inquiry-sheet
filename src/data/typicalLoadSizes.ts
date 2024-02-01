import { ILoadsTypes } from "../features/interfaces";

export class Load {
  constructor(
    public id: number | undefined,
    public label: string,
    public name: string,
    public length: number,
    public width: number,
    public height: number,
    public L2: number,
    public W2: number,
    public W3: number,
    public H2: number,
    public H3: number,
    public weightMin: number,
    public weightMax: number,
    public overhang: boolean,
    public material: number,
    public loadSide: 0 | 1,
    public secured: boolean,
    public capacity?: number

  ) { }

  get volume() {
    console.log(this.length, this.width, this.height)
    return this.length * this.width * this.height;
  }
}

class EuroPallet extends Load {
  constructor() {
    super(
      undefined,
      'Europallet',
      'Europallet',
      1200,
      800,
      0,
      1200,
      800,
      600,
      0,
      0,
      0,
      1500,
      false,
      0,
      0,
      false
    );
  }
}

class KLT600x400 extends Load {
  constructor() {
    super(
      undefined,
      'KLT 600x400 Box',
      'KLT 600x400 Box',
      600,
      400,
      0,
      600,
      400,
      0,
      0,
      0,
      0,
      0,
      false,
      1,
      0,
      false
    );
  }
}

// Placeholder load type
class PlaceholderLoad extends Load {
  constructor() {
    super(
      undefined,
      'placeholder',
      'placeholder',
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      false,
      0,
      0,
      false
    );
  }
}

// Load instances
export const loadsToAdd: ILoadsTypes = {
  'placeholder': new PlaceholderLoad(),
  'euro': new EuroPallet(),
  'klt_600x400': new KLT600x400(),
  // Add more load types as needed
};
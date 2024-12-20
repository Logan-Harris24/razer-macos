import { RazerDevice } from './razerdevice';

export class RazerDeviceAccessory extends RazerDevice {
  constructor(addon, settingsManager, stateManager, razerProperties) {
    super(addon, settingsManager, stateManager, razerProperties);
  }

  async init() {
    this.brightness = this.addon.accessoryGetBrightness(this.internalId);
    return super.init();
  }

  getState() {
    const deviceState = super.getState();
    deviceState['brightness'] = this.brightness;
    return deviceState;
  }

  resetToState(state) {
    super.resetToState(state);
    if(typeof state.brightness !== 'undefined') {
      this.setBrightness(state.brightness);
    }
  }

  setModeNone() {
    super.setModeNone();
    this.addon.accessorySetModeNone(this.internalId);
  }

  setModeStaticNoStore(color) {
    super.setModeStaticNoStore(color);
    this.addon.accessorySetModeStaticNoStore(this.internalId, new Uint8Array(color));
  }

  setModeStatic(color) {
    super.setModeStatic(color);
    this.addon.accessorySetModeStatic(this.internalId, new Uint8Array(color));
  }
  setSpectrum() {
    super.setSpectrum();
    this.addon.accessorySetModeSpectrum(this.internalId);
  }

  setBreathe(color) {
    super.setBreathe(color);
    this.addon.accessorySetModeBreathe(this.internalId, new Uint8Array(color));
  }

  //device specific
  setWaveExtended(directionSpeed) {
    this.setModeState('waveExtended', directionSpeed);
    this.addon.accessorySetModeWave(this.internalId, directionSpeed);
  }

  getBrightness() {
    return this.brightness;
  }

  setBrightness(brightness) {
    this.brightness = brightness;
    this.addon.accessorySetBrightness(this.internalId, brightness);
  }
}
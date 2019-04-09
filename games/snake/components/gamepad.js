export default class GamepadHelper {
  constructor() {
    this.gamepad = null;
    window.addEventListener('gamepadconnected', e => this.gamepadConnected(e));
  }

  gamepadConnected(e) {
    this.gamepad = e.gamepad;
    console.log('Gamepad connected at index %d: %s. %d buttons, %d axes.',
      e.gamepad.index, e.gamepad.id,
      e.gamepad.buttons.length, e.gamepad.axes.length);
  }

  axis(num) {
    const gp = navigator.getGamepads()[0];
    if (!gp) {
      return null;
    }
    return gp.axes[num];
  }
}

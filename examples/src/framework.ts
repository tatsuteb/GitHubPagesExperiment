import { CubismFramework } from './CubismWebFramework/src/live2dcubismframework';
import { ICubismModelSetting } from './CubismWebFramework/src/icubismmodelsetting';
import { CubismModelSettingJson } from './CubismWebFramework/src/cubismmodelsettingjson';
// math
import { CubismMatrix44 } from './CubismWebFramework/src/math/cubismmatrix44';
// model
import { CubismUserModel } from './CubismWebFramework/src/model/cubismusermodel';

window.globalThis.CubismFramework = CubismFramework;
window.globalThis.ICubismModelSetting = ICubismModelSetting;
window.globalThis.CubismModelSettingJson = CubismModelSettingJson;
window.globalThis.CubismMatrix44 = CubismMatrix44;
window.globalThis.CubismUserModel = CubismUserModel;
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import * as UnityEngine from "UnityEngine";

export default class Test extends ZepetoScriptBehaviour {
    
    public collider: UnityEngine.Collider;
    
    Start() {
        let collider = this.collider;
        
        let colliderPosition: UnityEngine.Vector3 = collider.gameObject.transform.position;
        let objectPosition: UnityEngine.Vector3 = this.transform.position;
        let direction: UnityEngine.Vector3 = colliderPosition - objectPosition;

    }

}
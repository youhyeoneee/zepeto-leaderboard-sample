import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Animator, Input, KeyCode } from 'UnityEngine'

export default class AnimatorTest extends ZepetoScriptBehaviour {
    private animator : Animator;


    Start() {
        this.animator = this.GetComponent<Animator>();
    }
    
    Update(){
        if (Input.GetKeyUp(KeyCode.F))
        {
            console.log("F");
            this.animator.SetBool("New Bool", true);
        }
    }
    
    
}
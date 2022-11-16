import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { GameObject } from 'UnityEngine'
import { Button } from 'UnityEngine.UI'
export default class ButtonTest extends ZepetoScriptBehaviour {
    
    public _buff_Head : GameObject;
    public _buff_button : Button[];

    Start() {
        for(let i = 0; i < this._buff_Head.transform.childCount; i++)
            this._buff_button.push(this._buff_Head.transform.GetChild(i).GetComponent<Button>());

        for(let i = 0; i < this._buff_Head.transform.childCount; i++)
            console.log(this._buff_button[i]);
    }
    
}
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Image, Text } from 'UnityEngine.UI'
import { Texture, Texture2D, Sprite, Rect, Vector2, GameObject } from 'UnityEngine'
import { ZepetoWorldHelper, Users } from 'ZEPETO.World'

export default class Group extends ZepetoScriptBehaviour {
    
    public playerImage: Image;
    public playerRankText: Text;
    public playerNameText: Text;
    public playerScoreText: Text;
    
    public SetGroup(userId: string, name: string, rank: number, score: number){
        // 이미지
        ZepetoWorldHelper.GetProfileTexture(userId,(texture:Texture)=>{
            this.playerImage.sprite = this.GetSprite(texture);
        },(error)=>{
            console.log(error);
        });
        
        // 이름, 랭크, 점수
        this.playerNameText.text = name;
        this.playerRankText.text = rank.toString();
        this.playerScoreText.text = score.toString();
    
    }
    
    GetSprite(texture:Texture){
        let rect:Rect = new Rect(0, 0, texture.width, texture.height);
        return Sprite.Create(texture as Texture2D, rect, new Vector2(0.5, 0.5));
    }
    
}
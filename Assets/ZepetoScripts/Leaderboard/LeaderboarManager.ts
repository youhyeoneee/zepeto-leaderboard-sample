import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import {GetRangeRankResponse, LeaderboardAPI, ResetRule} from "ZEPETO.Script.Leaderboard";
import {GameObject, Rect, Sprite, Texture, Texture2D, Vector2} from "UnityEngine";
import {Text} from "UnityEngine.UI";
import Group from './Group'

export default class LeaderboarManager extends ZepetoScriptBehaviour {

    public leaderboardId: string = "7fac72ac-283d-47a1-9749-b64fb246c297";
    private startRank: number = 1;
    private endRank: number = 3;
    public resetRule: ResetRule;
    public groups : GameObject[] = [];

    public OnEnable(){
        this.LoadLeaderboard();
    }
    
    public LoadLeaderboard(){
        
        LeaderboardAPI.GetRangeRank(this.leaderboardId, this.startRank, this.endRank,
            this.resetRule ,false ,(result)=>{this.OnResult(result);}, (error)=>{this.OnError(error);});
    }
    
    OnResult(result: GetRangeRankResponse) {
        console.log(`result.isSuccess: ${result.isSuccess}`);
        
        if (result.rankInfo.myRank) {
            var myRank = result.rankInfo.myRank;
            // Group 세팅 
            this.groups[0].GetComponent<Group>().SetGroup(myRank.member, myRank.name, myRank.rank, myRank.score);
        }

        if (result.rankInfo.rankList) {
            var end = (result.rankInfo.rankList.length > this.endRank)? this.endRank : result.rankInfo.rankList.length;
            
            for (let i = 0; i < end; ++i) {
                var rank = result.rankInfo.rankList[i];
                // Group 세팅
                this.groups[i+1].GetComponent<Group>().SetGroup(rank.member, rank.name, rank.rank, rank.score);
            }
        }
    }

    OnError(error: string) {
        console.error(error);
    }
}
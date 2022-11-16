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
    public groups : GameObject[];

    OnEnable() {
        this.UpdateLeaderboard()
    }
    
    public UpdateLeaderboard(){
        // 점수
        LeaderboardAPI.GetRangeRank(this.leaderboardId, this.startRank, this.endRank,
            this.resetRule ,false ,this.OnResult, this.OnError);
    }
    
    OnResult(result: GetRangeRankResponse) {
        console.log(`result.isSuccess: ${result.isSuccess}`);
        let groups = GameObject.Find("Leaderboard").GetComponent<LeaderboarManager>().groups;

        if (result.rankInfo.myRank) {
            console.log(`member: ${result.rankInfo.myRank.member}, rank: 
    ${result.rankInfo.myRank.rank}, score: ${result.rankInfo.myRank.score}, name: 
    ${result.rankInfo.myRank.name}`);

            // Group 세팅 
            groups[0].GetComponent<Group>().SetGroup(result.rankInfo.myRank.member, result.rankInfo.myRank.name, result.rankInfo.myRank.rank, result.rankInfo.myRank.score);
        }

        if (result.rankInfo.rankList) {
            for (let i = 0; i < result.rankInfo.rankList.length; ++i) {
                var rank = result.rankInfo.rankList.get_Item(i);
                console.log(`i: ${i}, member: ${rank.member}, rank: ${rank.rank}, score: 
    ${rank.score}, name: ${result.rankInfo.myRank.name}`);
                
                // Group 세팅
                groups[i+1].GetComponent<Group>().SetGroup(result.rankInfo.myRank.member, result.rankInfo.myRank.name, result.rankInfo.myRank.rank, result.rankInfo.myRank.score);
            }
        }
    }

    OnError(error: string) {
        console.error(error);
    }
}
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { GetRangeRankResponse, LeaderboardAPI, ResetRule } from "ZEPETO.Script.Leaderboard";
import { GameObject, Transform } from "UnityEngine";
import Group from './Group'

export default class LeaderboardLoader extends ZepetoScriptBehaviour {

    public leaderboardId: string;
    public resetRule: ResetRule;
    private startRank: number = 1;
    private endRank: number = 10000; // Ranking information can be processed up to 10,000 cases at a time

    @SerializeField() private myScoreGroup: GameObject;
    @SerializeField() private contentsParent: GameObject;
    @SerializeField() private groupPrefab: GameObject;
    
    Awake(){
        this.gameObject.SetActive(false);
    }

    OnEnable(){
        this.LoadLeaderboard();
    }

    OnDisable(){
        this.UnLoadLeaderboard();
    }

    LoadLeaderboard(){
        LeaderboardAPI.GetRangeRank(this.leaderboardId, this.startRank, this.endRank, this.resetRule ,false ,
            (result)=>{this.OnResult(result);},
            (error)=>{console.error(error);}
        );
    }

    OnResult(result: GetRangeRankResponse) {
        if (result.rankInfo.myRank) {
            // Set Group - My Score
            var myRank = result.rankInfo.myRank;
            const _group : Group = this.myScoreGroup.GetComponent<Group>();
            _group.SetGroup(myRank.member, myRank.name, myRank.rank, myRank.score);
        }

        if (result.rankInfo.rankList) {
            var end = (result.rankInfo.rankList.length < this.endRank)? result.rankInfo.rankList.length : this.endRank;
            for (let i = 0; i < end; ++i) {
                var rank = result.rankInfo.rankList[i];
                // Set Groups - All Rankings
                var newGroup : GameObject = GameObject.Instantiate(this.groupPrefab, this.contentsParent.transform) as GameObject;
                const _group : Group = newGroup.GetComponent<Group>();
                _group.SetGroup(rank.member, rank.name, rank.rank, rank.score);
            }
        }
    }

    UnLoadLeaderboard(){
        this.contentsParent.GetComponentsInChildren<Group>().forEach((child)=>{
                GameObject.Destroy(child.gameObject);
            }
        )
    }

}
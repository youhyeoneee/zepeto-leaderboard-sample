import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { SetScoreResponse, LeaderboardAPI } from 'ZEPETO.Script.Leaderboard'
import { Input, PlayerPrefs, GameObject } from 'UnityEngine'
import { Text } from 'UnityEngine.UI'
import {ZepetoPlayer, ZepetoPlayers} from "ZEPETO.Character.Controller";
import LeaderboarManager from './LeaderboarManager'

export default class GameManager extends ZepetoScriptBehaviour {

    public score: number = 20;
    public scoreText: Text;
    public bestScoreText: Text;
    public leaderboard : GameObject;

    Start() {
        this.bestScoreText.text = PlayerPrefs.GetInt("BestScore", 0).toString();
    }
    
    Update() {
        this.score++;
        if (Input.anyKeyDown){
            this.GameOver()
        }

    }
    
    
    GameOver(){
        // 현재 점수
        this.scoreText.text = this.score.toString(); // 점수 

        // 최고 점수
        if(PlayerPrefs.GetInt("BestScore", 0) < this.score){
            PlayerPrefs.SetInt("BestScore", this.score);
            this.bestScoreText.text = this.score.toString();
            this.SetScore(this.score);
        }
    }
    SetScore(score: number){
        // LeaderboardAPI.SetScore(this.leaderboardId, this.score, this.OnResult, this.OnError);
        
        // 리더보드 업데이트
        this.leaderboard.GetComponent<LeaderboarManager>().UpdateLeaderboard();
    }

    OnResult(result: SetScoreResponse) {
        console.log(`result.isSuccess: ${result.isSuccess}`);
    }

    OnError(error: string) {
        console.error(error);
    }
}
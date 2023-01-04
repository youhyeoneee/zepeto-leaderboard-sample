import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { SetScoreResponse, LeaderboardAPI } from 'ZEPETO.Script.Leaderboard';

export default class SetScoreExample extends ZepetoScriptBehaviour {

    public leaderboardId: string;
    public score: number;

    Start() {
        LeaderboardAPI.SetScore(this.leaderboardId, this.score, this.OnResult, this.OnError);
    }

    OnResult(result: SetScoreResponse) {
        console.log(`result.isSuccess: ${result.isSuccess}`);
    }

    OnError(error: string) {
        console.error(error);
    }
}
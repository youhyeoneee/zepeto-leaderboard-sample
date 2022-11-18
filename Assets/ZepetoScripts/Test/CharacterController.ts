import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { SpawnInfo, ZepetoPlayers, LocalPlayer, ZepetoCharacter } from
        'ZEPETO.Character.Controller'

export default class CharacterController extends ZepetoScriptBehaviour {

    Start() {
        // ZepetoPlayers.instance.CreatePlayerWithZepetoId("", "dbgus0311", new SpawnInfo(), true);
        ZepetoPlayers.instance.CreatePlayerWithUserId("", "5f7c2283734c773bc0afc48b", new SpawnInfo(), true);


    }

}
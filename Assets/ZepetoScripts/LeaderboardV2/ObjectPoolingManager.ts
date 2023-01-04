import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { GameObject, QueueMode } from 'UnityEngine';
import { QueueImpl } from './Queue';

export default class ObjectPoolingManager extends ZepetoScriptBehaviour {

    public queue: QueueImpl = new QueueImpl();

    @SerializeField() private myScoreGroup: GameObject;
    @SerializeField() private contentsParent: GameObject;
    @SerializeField() private groupPrefab: GameObject;

    Start() {
        for (let i = 0; i < 100; i++) {
            const newGroup: GameObject = GameObject.Instantiate(this.groupPrefab, this.contentsParent.transform) as GameObject;
            this.queue.enQueue(newGroup);
            newGroup.SetActive(false);
        }
    }
    
    InsertQueue(_object: GameObject) {
        this.queue.enQueue(_object);
        _object.SetActive(false);
    }
    
    GetQueue() {
        const _object: GameObject = this.queue.deQueue();
        _object.SetActive(true);
        return _object;
    }
    
    
}
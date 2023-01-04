import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { GameObject } from 'UnityEngine';

// 큐 추상화 인터페이스
 interface Queue {
    readonly size: number;
    enQueue(value: GameObject): void;
    deQueue(): void;
    search(num: number): GameObject;
}

// 추가될 노드 타입 생성
type QueueNode = {
    value: GameObject;
    next?: QueueNode;
}

// 큐 클래스
export class QueueImpl implements Queue {
    
    constructor() {
    }
    private _size: number = 0; // _size 값을 외부에서 접근하지 못하게 묶습니다.
    private head?: QueueNode; // head는 노드 인터페이스 타입
    private tail?: QueueNode; // tail도 노드 인터페이스 타입

    // 묶여있는 _size를 밖에서 호출해주기 위해 getter를 사용합니다.
    get size() {
        return this._size;
    }

    // 큐 추가
    enQueue(value: GameObject) {
        const node: QueueNode = { value };
        if (this._size === 0) {
            this.head = node;
        } else {
            this.tail!.next = node;
        }
        this.tail = node;
        this._size++;
    }

    // 큐 제거
    deQueue(): GameObject {
        let current: QueueNode = this.head;
        if (!current) throw new Error('queue not exist..😑'); // 큐가 하나도 없는 상태면 에러 발생
        if (current.value === this.tail?.value) {
            this.tail = undefined;
        }
        const next = current.next;
        this.head = next;
        this._size--;
        
        return current.value;
    }

    // 큐 검색 = index
    search(num: number): GameObject {
        // 큐가 하나도 없거나 해당하는 큐가 없을 경우에 에러 발생
        if (!this.head) throw new Error('queue not exist..😑');
        if (num < 0 || num >= this._size) {
            throw new Error('No corresponding stacks found..😣');
        }
        let count: number = 0;
        let current: QueueNode = this.head;
        while (count < num) {
            current = current.next!;
            count++;
        }
        return current.value;
    }
}
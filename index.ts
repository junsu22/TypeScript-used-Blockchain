import crypto from "crypto";//module x , tsconfig add "esModuleInterop":true 


interface BlockShape {
    hash: string;
    prevHash:string;
    height:number;
    data:string;

}

class Block implements BlockShape{
    public hash:string;
    constructor(
        public prevHash:string, //블록의 데이터를 받는다
        public height:number,
        public data:string
    ) {
        this.hash =  Block.calculateHash(prevHash, height, data); // 데이터의 해시값은 여기서 생성
    }
    static calculateHash(prevHash:string, height:number, data:string){
        const toHash = `${prevHash}${height}${data}`// crypto 이용 -> import
        return crypto.createHash("sha256").update(toHash).digest("hex")
    }
}

class Blockchain {
    private blocks: Block[] 
    constructor(){
        this.blocks = [];
    }
    private getPrevHash(){//이전 해시값 불러오기 
        if(this.blocks.length === 0) return ""//마지막 해시값이 없기때문에 "" 를  리턴
        return this.blocks[this.blocks.length -1].hash // 마지막 블록 해시값 리턴
    }
    public addBlock(data:string){// 저장하고 싶은 데이터 
        // 새로운 블록 생성
        const newBlock = new Block(this.getPrevHash(), this.blocks.length+1,data) //새로운 블록을 만들어주는  
        //새로운 블록을 생성하려면 이전 해시값 prevHash 필요. 
        this.blocks.push(newBlock);
    }
    //블록에 접근 할 수 있는 함수 추가 
    public getBlocks(){
        // return [...this.blocks] //보안 문제 주의 하기.. state 에 접근을 못하게 막음. 해킹 코드 추가 되었지만 정상 적으로 작동 가능
        return this.blocks; 
        //  return [...this.blocks]
    }

}

const blockchain = new Blockchain();

blockchain.addBlock("First one");
blockchain.addBlock("second one");
blockchain.addBlock("third one");

// 보안문제 누군가 값을 추가 할수 있다.
blockchain.getBlocks().push(new Block("xxxxx", 11111,"JUNSU HACKEDDD"))
// 증상 : 출력이 되며, 줄줄이 이어진던것이 끊어진다. public get Block 수정한다.


// 모든 블록 호출
console.log(blockchain.getBlocks()) //로그 확인



// 123 => ;2387y28wrdhfs8ufh807werruifsdhf78dasuhfdsh78ewfs
// 데이터가 변하지 않으면 , 해시값도 변하지 않음 (블록체인 보호, 블록정보 수정 x )




// 출력 예시 . prevHash, 다음블록 hash 중복되는 값 비교
// Block {
//     prevHash: '',
//     height: 1,
//     data: 'First one',
//     hash: 'd90f2cc6ecdb63760af30f041a06e85e9a4d3376cccc09ff807e08c749e81ca9'
//   },
//   Block {
//     prevHash: 'd90f2cc6ecdb63760af30f041a06e85e9a4d3376cccc09ff807e08c749e81ca9',
//     height: 2,
//     data: 'second one',
//     hash: '52c6500a0c09f94a58c43b423ee490b1703c9a278a991d6886919e67848cfc0a'
//   },
//   Block {
//     prevHash: '52c6500a0c09f94a58c43b423ee490b1703c9a278a991d6886919e67848cfc0a',
//     height: 3,
//     data: 'third one',
//     hash: '3158ce4adcf1563c0de58a28fab9bee1c26b4e354708aeade55b088780970870'
//   }





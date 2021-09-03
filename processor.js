let MEMORY = [];

let allocate = 0xFFFF;
for (let i = 0; i < allocate; i++)
{
	MEMORY.push(0);
}

let RA = 0;
let RB = 0;
let RC = 0;
let RD = 0;
let IP = 0;

//Memory to memory
function mov_MEM_MEM(bytes)
{
	let d = MEMORY[IP + 1];
	let s = MEMORY[IP + 2];

	MEMORY[d] = MEMORY[s];
	IP = IP + bytes;
}

//Memory to RA
function mov_RA_MEM(bytes)
{
	let s = MEMORY[IP + 1];

	RA = MEMORY[s];
	IP = IP + bytes;
}

//Memory to RA
function mov_RB_MEM(bytes)
{
	let s = MEMORY[IP + 1];

	RB = MEMORY[s];
	IP = IP + bytes;
}

function intepreter()
{	
	switch(MEMORY[IP])
	{
		case 1:
			inst_Table[0][1].call(); break;
		case 2:
			inst_Table[1][1].call(); break;
		case 3:
			inst_Table[2][1].call(); break;
		case 4:
			inst_Table[3][1].call(); break;
		case 5:
			inst_Table[4][1].call(); break;
		case 6:
			inst_Table[5][1].call(); break;
		case 7:
			inst_Table[6][1].call(); break;
		case 8:
			inst_Table[7][1].call(); break;
		case 9:
			inst_Table[8][1].call(); break;
	}
}


let inst_Table = [
	[1, function(){mov_MEM_MEM(3)}],
	[2, function(){mov_RA_MEM(2)}],
	[3, function(){mov_RB_MEM(2)}],
	[4, function(){mov_RC_MEM(2)}],
	[5, function(){mov_RD_MEM(2)}],
	[6, function(){mov_MEM_RA(2)}],
	[7, function(){mov_MEM_RB(2)}],
	[8, function(){mov_MEM_RC(2)}],
	[9, function(){mov_MEM_RD(2)}],

]


MEMORY[0x0] = 0x02;
MEMORY[0x1] = 0x02;
MEMORY[0x2] = 0xFFFF;

MEMORY[0xFFFF] = 0xFF;
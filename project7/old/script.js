document.addEventListener('DOMContentLoaded', () => {
    const disksInput = document.getElementById('disks');
    const startButton = document.getElementById('start');
    const towerA = document.getElementById('tower-a');
    const towerB = document.getElementById('tower-b');
    const towerC = document.getElementById('tower-c');
    const movesList = document.getElementById('moves');
    let numberOfDisks = parseInt(disksInput.value);
    let moves = [];

    function createDisk(size) {
        const disk = document.createElement('div');
        disk.classList.add('disk');
        disk.style.width = `${size * 20}px`;
        disk.textContent = size;
        disk.dataset.size = size;
        return disk;
    }

    function initializeTowers(numDisks) {
        towerA.innerHTML = '';
        towerB.innerHTML = '';
        towerC.innerHTML = '';
        movesList.innerHTML = '';
        moves = [];
        for (let i = numDisks; i >= 1; i--) {
            towerA.appendChild(createDisk(i));
        }
    }

    function moveDisk(fromTower, toTower) {
        if (fromTower.children.length > 0) {
            const disk = fromTower.lastElementChild;
            toTower.appendChild(disk);
            moves.push(`Moved disk ${disk.dataset.size} from ${fromTower.id.slice(-1)} to ${toTower.id.slice(-1)}`);
            updateMovesList();
        }
    }

    function solveHanoi(n, source, auxiliary, destination) {
        if (n > 0) {
            solveHanoi(n - 1, source, destination, auxiliary);
            moveDisk(source, destination);
            solveHanoi(n - 1, auxiliary, source, destination);
        }
    }

    function updateMovesList() {
        movesList.innerHTML = '';
        moves.forEach(move => {
            const li = document.createElement('li');
            li.textContent = move;
            movesList.appendChild(li);
        });
    }

    startButton.addEventListener('click', () => {
        numberOfDisks = parseInt(disksInput.value);
        initializeTowers(numberOfDisks);
        // Delay the solving process for visualization
        setTimeout(() => {
            solveHanoi(numberOfDisks, towerA, towerB, towerC);
        }, 100); // Adjust delay as needed
    });

    // Initial setup
    initializeTowers(numberOfDisks);
});
class TacticalTicTacToe {
    constructor() {
        this.boardSize = 7;
        this.board = Array(this.boardSize).fill(null).map(() => Array(this.boardSize).fill(null));
        this.currentPlayer = 'X';
        this.hpX = 15;
        this.hpO = 15;
        this.gameOver = false;
        this.damageLog = [];
        
        this.initializeBoard();
        this.updateDisplay();
        this.setupEventListeners();
    }

    initializeBoard() {
        const boardElement = document.getElementById('game-board');
        boardElement.innerHTML = '';
        boardElement.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;

        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', () => this.handleCellClick(row, col));
                boardElement.appendChild(cell);
            }
        }
    }

    setupEventListeners() {
        document.getElementById('reset-btn').addEventListener('click', () => this.resetGame());
    }

    handleCellClick(row, col) {
        if (this.gameOver || this.board[row][col] !== null) {
            return;
        }

        this.board[row][col] = this.currentPlayer;
        this.updateCell(row, col);
        
        const sequences = this.checkSequences(row, col);
        if (sequences.length > 0) {
            this.processDamage(sequences);
        }

        if (!this.gameOver) {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateDisplay();
        }
    }

    updateCell(row, col) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            cell.textContent = this.board[row][col];
            cell.classList.add('occupied', this.board[row][col].toLowerCase());
        }
    }

    checkSequences(row, col) {
        const player = this.board[row][col];
        const directions = [
            { dr: 0, dc: 1 },   // Horizontal
            { dr: 1, dc: 0 },   // Vertical
            { dr: 1, dc: 1 },   // Diagonal \
            { dr: 1, dc: -1 }   // Diagonal /
        ];

        const sequences = [];
        const processedSequences = new Set();

        for (const dir of directions) {
            const sequence = this.findSequence(row, col, player, dir.dr, dir.dc);
            if (sequence && sequence.length >= 4) {
                const key = sequence.map(c => `${c.row},${c.col}`).sort().join('|');
                if (!processedSequences.has(key)) {
                    processedSequences.add(key);
                    sequences.push(sequence);
                }
            }
        }

        return sequences;
    }

    findSequence(row, col, player, dr, dc) {
        const sequence = [{ row, col }];
        
        // Check forward direction
        let r = row + dr;
        let c = col + dc;
        while (r >= 0 && r < this.boardSize && c >= 0 && c < this.boardSize && 
               this.board[r][c] === player) {
            sequence.push({ row: r, col: c });
            r += dr;
            c += dc;
        }

        // Check backward direction
        r = row - dr;
        c = col - dc;
        while (r >= 0 && r < this.boardSize && c >= 0 && c < this.boardSize && 
               this.board[r][c] === player) {
            sequence.unshift({ row: r, col: c });
            r -= dr;
            c -= dc;
        }

        return sequence.length >= 4 ? sequence : null;
    }

    processDamage(sequences) {
        const opponent = this.currentPlayer === 'X' ? 'O' : 'X';
        let totalDamage = 0;
        const highlightedCells = new Set();

        sequences.forEach(sequence => {
            const damage = sequence.length;
            totalDamage += damage;
            sequence.forEach(cell => {
                highlightedCells.add(`${cell.row},${cell.col}`);
            });
        });

        // Highlight sequence cells
        this.highlightSequence(highlightedCells);

        // Apply damage
        if (opponent === 'X') {
            this.hpX = Math.max(0, this.hpX - totalDamage);
        } else {
            this.hpO = Math.max(0, this.hpO - totalDamage);
        }

        // Log damage
        this.addDamageLog(this.currentPlayer, opponent, totalDamage, sequences.length);

        // Update display
        this.updateDisplay();

        // Check win condition
        if (this.hpX === 0 || this.hpO === 0) {
            this.endGame();
        } else {
            // Show damage message
            const statusEl = document.getElementById('game-status');
            statusEl.textContent = `Player ${this.currentPlayer} dealt ${totalDamage} damage!`;
            statusEl.classList.add('damage');
            setTimeout(() => {
                statusEl.classList.remove('damage');
                statusEl.textContent = '';
            }, 2000);
        }
    }

    highlightSequence(cells) {
        cells.forEach(key => {
            const [row, col] = key.split(',').map(Number);
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                cell.classList.add('sequence');
                setTimeout(() => {
                    cell.classList.remove('sequence');
                }, 1000);
            }
        });
    }

    addDamageLog(attacker, defender, damage, sequences) {
        const logEntry = {
            attacker,
            defender,
            damage,
            sequences,
            timestamp: new Date()
        };
        this.damageLog.unshift(logEntry);
        
        // Keep only last 10 entries
        if (this.damageLog.length > 10) {
            this.damageLog.pop();
        }

        this.updateDamageLog();
    }

    updateDamageLog() {
        const logContent = document.getElementById('log-content');
        logContent.innerHTML = '';

        if (this.damageLog.length === 0) {
            logContent.innerHTML = '<p style="color: var(--color-text-secondary); font-size: var(--font-size-s);">No damage dealt yet</p>';
            return;
        }

        this.damageLog.forEach(entry => {
            const logEntry = document.createElement('div');
            logEntry.className = `log-entry damage-${entry.attacker.toLowerCase()}`;
            const sequenceText = entry.sequences > 1 ? ` (${entry.sequences} sequences)` : '';
            logEntry.textContent = `Player ${entry.attacker} dealt ${entry.damage} damage to Player ${entry.defender}${sequenceText}`;
            logContent.appendChild(logEntry);
        });
    }

    updateDisplay() {
        // Update HP values
        document.getElementById('hp-x').textContent = this.hpX;
        document.getElementById('hp-o').textContent = this.hpO;

        // Update HP bars
        const hpPercentX = (this.hpX / 15) * 100;
        const hpBarX = document.getElementById('hp-bar-x');
        hpBarX.style.width = `${hpPercentX}%`;
        hpBarX.className = 'hp-bar-fill';
        if (hpPercentX <= 33) {
            hpBarX.classList.add('critical');
        } else if (hpPercentX <= 66) {
            hpBarX.classList.add('low');
        }

        const hpPercentO = (this.hpO / 15) * 100;
        const hpBarO = document.getElementById('hp-bar-o');
        hpBarO.style.width = `${hpPercentO}%`;
        hpBarO.className = 'hp-bar-fill';
        if (hpPercentO <= 33) {
            hpBarO.classList.add('critical');
        } else if (hpPercentO <= 66) {
            hpBarO.classList.add('low');
        }

        // Update turn indicators
        document.getElementById('turn-x').classList.toggle('active', this.currentPlayer === 'X' && !this.gameOver);
        document.getElementById('turn-o').classList.toggle('active', this.currentPlayer === 'O' && !this.gameOver);
    }

    endGame() {
        this.gameOver = true;
        const statusEl = document.getElementById('game-status');
        
        if (this.hpX === 0 && this.hpO === 0) {
            statusEl.textContent = "It's a tie!";
            statusEl.classList.add('winner');
        } else if (this.hpX === 0) {
            statusEl.textContent = 'Player O Wins!';
            statusEl.classList.add('winner');
        } else {
            statusEl.textContent = 'Player X Wins!';
            statusEl.classList.add('winner');
        }
    }

    resetGame() {
        this.board = Array(this.boardSize).fill(null).map(() => Array(this.boardSize).fill(null));
        this.currentPlayer = 'X';
        this.hpX = 15;
        this.hpO = 15;
        this.gameOver = false;
        this.damageLog = [];
        
        this.initializeBoard();
        this.updateDisplay();
        
        const statusEl = document.getElementById('game-status');
        statusEl.textContent = '';
        statusEl.classList.remove('winner', 'damage');
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TacticalTicTacToe();
});


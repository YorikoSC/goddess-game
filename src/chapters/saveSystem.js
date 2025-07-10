function saveGame() {
  
    const gameProgress = {
      currentArc: "arc2",
      currentChapter: "chapter3",
      playerChoices: getPlayerChoices(), 
      unlockedScenes: getUnlockedScenes() 
    };
  
   
    localStorage.setItem("goddessGameSave", JSON.stringify(gameProgress));
  

    alert("Игра сохранена!");
  }
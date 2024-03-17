

// Données simulées pour la démo
const users = [
    { username: "user1", password: "password1", profilePicture: null },
    { username: "user2", password: "password2", profilePicture: null }
];

let currentUser = null;

function register() {
    const newUsername = document.getElementById("new-username").value;
    const newPassword = document.getElementById("new-password").value;
    const profilePicture = document.getElementById("profile-picture").files[0];
    // Vérifie si les champs sont vides
    if (!newUsername.trim() || !newPassword.trim() || !profilePicture) {
        alert("Veuillez remplir tous les champs.");
        return;
    }
    // Vérifie si le nom d'utilisateur est déjà utilisé
    const existingUser = users.find(user => user.username === newUsername);
    if (existingUser) {
        alert("Ce nom d'utilisateur est déjà utilisé. Veuillez en choisir un autre");
        return;
    }
    // Enregistre le nouvel utilisateur avec sa photo de profil
    users.push({ username: newUsername, password: newPassword, profilePicture });
    alert("Inscription réussie !");
    // Réinitialise les champs du formulaire
    document.getElementById("new-username").value = "";
    document.getElementById("new-password").value = "";
    document.getElementById("profile-picture").value = "";
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // Vérifie les informations d'identification
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        // Connecte l'utilisateur
        currentUser = user;
        document.getElementById("identification-page").style.display = "none";
        document.getElementById("chat-page").style.display = "block";
    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
}

function sendMessage() {
    const messageInput = document.getElementById("message");
    const message = messageInput.value.trim();
    if (message) {
        const chatSection = document.getElementById("chat-section");
        const newMessage = document.createElement("div");
        newMessage.classList.add("message", "sent");
        
        // Créer une balise img pour afficher la photo de profil de l'utilisateur
        const userProfileImg = document.createElement("img");
        userProfileImg.src = currentUser.profilePicture ? URL.createObjectURL(currentUser.profilePicture) : "placeholder.jpg";
        userProfileImg.alt = "Photo de profil";
        userProfileImg.classList.add("user-profile");
        newMessage.appendChild(userProfileImg);
        
        // Ajouter le message texte
        const messageText = document.createElement("span");
        messageText.textContent = currentUser.username + ": " + message;
        newMessage.appendChild(messageText);

        chatSection.appendChild(newMessage);
        messageInput.value = "";
        // Fait défiler jusqu'au bas du chat
        chatSection.scrollTop = chatSection.scrollHeight;
    }
}

function toggleEntertainment() {
    const entertainmentSection = document.getElementById("entertainment-section");
    if (entertainmentSection.style.display === "none") {
        entertainmentSection.style.display = "block";
    } else {
        entertainmentSection.style.display = "none";
    }
}

function previewMedia(event) {
    const photosSection = document.getElementById("photos-section");
    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media");
    const media = document.createElement(event.target.files[0].type.startsWith('image/') ? 'img' : 'video');
    media.src = URL.createObjectURL(event.target.files[0]);
    media.classList.add(event.target.files[0].type.startsWith('image/') ? 'photo' : 'video');
    media.onload = function() {
        URL.revokeObjectURL(this.src);
    }
    mediaContainer.appendChild(media);

    const likeButton = document.createElement("button");
    likeButton.textContent = "J'aime";
    likeButton.classList.add("like-button");
    likeButton.onclick= function() {
        likeMedia(media.src);
    };
    mediaContainer.appendChild(likeButton);

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.placeholder = "Ajouter un commentaire";
    commentInput.classList.add("comment-input");
    mediaContainer.appendChild(commentInput);

    const commentButton = document.createElement("button");
    commentButton.textContent = "Commenter";
    commentButton.classList.add("comment-button");
    commentButton.onclick = function() {
        commentOnMedia(media.src, commentInput.value);
        commentInput.value = "";
    };
    mediaContainer.appendChild(commentButton);

    photosSection.appendChild(mediaContainer);
}

function likeMedia(mediaSrc) {
    alert("Média aimé : " + mediaSrc);
}

function commentOnMedia(mediaSrc, comment) {
    alert("Commentaire sur le média " + mediaSrc + " : " + comment);
}

function searchFriend() {
    const searchBar = document.getElementById("search-bar");
    const searchQuery = searchBar.value.trim().toLowerCase();
    if (searchQuery) {
        // Simuler une recherche d'amis (données factices)
        const friendList = document.getElementById("friend-list");
        friendList.innerHTML = ""; // Effacer les résultats précédents
        const matchingUsers = users.filter(user => user.username.toLowerCase().includes(searchQuery));
        matchingUsers.forEach(user => {
            const friendItem = document.createElement("div");
            friendItem.textContent = user.username;
            friendList.appendChild(friendItem);
        });
    } else {
        alert("Veuillez entrer un terme de recherche.");
    }
}

song = "";
leftWristx = 0;
leftWristy = 0;
rightWristy = 0;
rightWristx = 0;
var vol;
var music_speed;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.parent("cam_div");
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded)
}

function draw() {
    image(video, 0, 0, 500, 500);
    posenet.on('pose', gotPoses);
    fill('#ff7403');
    stroke('#ff7300');
    strokeWeight(5)
    if (score > 0.2) {
        circle(leftWristx, leftWristy, 20);
            vol = (floor(Number(leftWristy)) / 500).toFixed(1);

            console.log("volume:", vol);
            document.getElementById('volume').innerHTML = "Volume : " + vol;
    }
    if(score1 > 0.2) {
        circle(rightWristx, rightWristy, 20)
        if(rightWristy >0 && rightWristy<100) {music_speed = 0.5;console.log(music_speed);}
        else if(rightWristy >100 && rightWristy<=200) {music_speed = 1.0;console.log(music_speed);}
        else if(rightWristy >200 && rightWristy<=300) {music_speed = 1.5;console.log(music_speed);}
        else if(rightWristy >300 && rightWristy<=400) {music_speed = 2.0;console.log(music_speed);}
        else if(rightWristy >400 && rightWristy<=500) {music_speed = 0.5;console.log(music_speed);}
        
    }
}
function pause() {
    song.pause()
}
function play() {
    song.play()
    song.setVolume(vol);
    document.getElementById('speed').innerHTML = "Speed : " + music_speed;
    song.rate(music_speed);
}

function modelLoaded() {
    console.info('Model initialized');
}
score = 0;
score1 = 0;
function gotPoses(results) {
    if (results.length > 0) {
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristy = results[0].pose.rightWrist.y;
        rightWristx = results[0].pose.rightWrist.x;
        console.log(results);
        console.log(`Left Wrist X = ${leftWristx} Left Wrist Y = ${leftWristy}\nRight Wrist X= ${rightWristx} Right Wrist Y = ${rightWristy}`);
        score = results[0].pose.leftWrist.confidence;
        score1 = results[0].pose.keypoints[10].score;
        console.log(score, score1);
    }
}
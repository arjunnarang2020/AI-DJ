song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
counter = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        console.log("scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function modelLoaded() {
    console.log('poseNet is initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
    
    if(scoreRightWrist > 0.001)
     {circle(rightWristX, rightWristY, 20);
 
     if (rightWristY > 0 && rightWristY < 250)
     {
         document.getElementById("song").innerHTML = ""
         ;
     } 
     if (rightWristY > 250 && rightWristY <= 500)
     {
         document.getElementById("song").innerHTML = ""
         ;
     }
     
    }
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWrist, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        leftWristY_divide_1000 = remove_decimals/1000;
        volume = leftWristY_divide_1000 *2;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume); 
    }
    
}

function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);

}
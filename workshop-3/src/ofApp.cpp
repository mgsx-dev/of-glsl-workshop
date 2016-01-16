#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
	shaderPath = "shaders/a/shader";
	shader = new ofShader();
	shader->load(shaderPath);

	model.loadModel(modelPath);

	cam.setupPerspective(true, 45, 0.1, 10000, ofVec2f(0,0));

	glEnable(GL_DEPTH_TEST);
	glEnable(GL_CULL_FACE);
	glFrontFace(GL_CCW);
}

//--------------------------------------------------------------
void ofApp::update(){


}

//--------------------------------------------------------------
void ofApp::draw(){
	ofClear(0,0,0,0);

    shader->begin();

    shader->setUniform1f("time", ofGetElapsedTimef());
    shader->setUniform2f("size", ofVec2f(ofGetWindowSize()));
    shader->setUniform2f("mouse", ofVec2f(ofGetMouseX(), ofGetMouseY()));

    cam.setTarget(ofVec3f(0,0,0));

    cam.begin();

    model.drawFaces();

    cam.end();

    shader->end();
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
	bool shaderHasChanged = false;
	if(key >= 'a' && key <= 'z')
	{
		shaderPath = "shaders/" + ofToString((char)key) + "/shader";

		shaderHasChanged = true;

		ofLog(OF_LOG_NOTICE, "switch to shader " + shaderPath);
	}
	else if(key == OF_KEY_F5)
	{
		ofLog(OF_LOG_NOTICE, "reload model " + modelPath);

		model.loadModel(modelPath);

		shaderHasChanged = true;

		ofLog(OF_LOG_NOTICE, "reload shader " + shaderPath);
	}
	else if(key == OF_KEY_F2)
	{
		depthTest = !depthTest;
		if(depthTest)
		{
			ofLog(OF_LOG_NOTICE, "enable depth test");
			glEnable(GL_DEPTH_TEST);
		}
		else
		{
			ofLog(OF_LOG_NOTICE, "disable depth test");
			glDisable(GL_DEPTH_TEST);
		}
	}
	if(shaderHasChanged)
	{
		delete shader;
		shader = new ofShader();
		shader->load(shaderPath);
	}
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}

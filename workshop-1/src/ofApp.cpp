#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
	shaderPath = "shaders/a/shader";
	shader = new ofShader();
	shader->load(shaderPath);
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
    ofDrawRectangle(0, 0, ofGetWidth(), ofGetHeight());
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
		shaderHasChanged = true;

		ofLog(OF_LOG_NOTICE, "reload shader " + shaderPath);
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
	ofLog(OF_LOG_NOTICE, "mouse (%d, %d) : (%f, %f)", x, y,
			(float) x / (float)ofGetScreenWidth(),
			(float) y / (float)ofGetScreenHeight());
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

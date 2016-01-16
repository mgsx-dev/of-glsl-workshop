#version 120

uniform float time;
uniform vec2 size;
uniform vec2 mouse;

float rand1(float x){
    return fract(sin(x * 12.9898) * 43758.5453) * 2.0 - 1.0;
}

float noise1(float x, float frequency)
{
  float v = x * frequency;

  float ix = floor(v);

  return rand1(ix);
}

void main( void ) {

	vec2 pos = vec2(gl_FragCoord.x / size.x, gl_FragCoord.y / size.y); 
	vec2 cur = vec2(mouse.x / size.x, mouse.y / size.y); 

	float value = noise1(pos.x * cur.x * 10.0 + time * 0.1, 10.0) * cur.y;

  	float lum = step(pos.y - value, 0.5);

    gl_FragColor = vec4(lum,lum,lum,1.0);
}
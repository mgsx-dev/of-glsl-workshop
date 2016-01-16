#version 120

uniform float time;
uniform vec2 size;
uniform vec2 mouse;


void main()
{
	vec2 pos = vec2(gl_FragCoord.x / size.x, gl_FragCoord.y / size.y); 
	vec2 cur = vec2(mouse.x / size.x, 1.0 - mouse.y / size.y); 
	
	float angle = -cur.x * 10.0;
	
	vec2 focus = vec2(cos(angle), sin(angle)) * 0.3 + 0.5;
	
	vec2 dif = focus - pos;
	
	float len = length(dif);
	pos *= pow(len, cur.y);
	
	float gx = step(abs(fract(pos.x * 10.0 - 0.5)), 0.1);
	float gy = step(abs(fract(pos.y * 10.0 - 0.5)), 0.1);
	
	float lum = gx + gy;
	
	gl_FragColor = vec4(lum, lum, lum, 1.0);
}
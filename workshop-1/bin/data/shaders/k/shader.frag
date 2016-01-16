#version 120

uniform float time;
uniform vec2 size;
uniform vec2 mouse;

void main()
{
	vec2 pos = vec2(gl_FragCoord.x / size.x, gl_FragCoord.y / size.y); 
	vec2 cur = vec2(mouse.x / size.x, mouse.y / size.y); 
    
	float v = 1.0 - length(pos - vec2(0.5, 0.5)) * 2.0;
	
	vec3 color = vec3(v,v,v);
	
	gl_FragColor = vec4(color, 1.0);
}
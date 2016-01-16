#version 120

uniform float time;
uniform vec2 size;
uniform vec2 mouse;

void main()
{
	vec2 pos = vec2(gl_FragCoord.x / size.x, gl_FragCoord.y / size.y); 
	vec2 cur = vec2(mouse.x / size.x, mouse.y / size.y); 
	
	float value = (sin(pos.x * 3.1415 * 2.0 * 10.0 * cur.x + time * 10.0) * cur.y + 1.0) * 0.5;
	
	float lum = smoothstep(-0.01, 0.01, value - pos.y);
	
	vec3 colorA = vec3(1.0, 0.5, 0.0);
	vec3 colorB = vec3(0.5, 0.5, 1.0);
	
	vec3 color = mix(colorA, colorB, lum);
	
	gl_FragColor = vec4(color, 1.0);
}
#version 120

uniform float time;
uniform vec2 size;
uniform vec2 mouse;

float nsin(float x)
{
	return sin(x * 3.1415) * 0.5 + 0.5;
}

void main()
{
	vec2 pos = vec2(gl_FragCoord.x / size.x, gl_FragCoord.y / size.y); 
	vec2 cur = vec2(mouse.x / size.x, mouse.y / size.y); 

	pos = pos * 2.0 - 1.0;
	
	float v = 1.0 - length(pos);
	vec2 pol = vec2(atan(pos.y, pos.x) / 3.1415, v);
	
	pol.y += nsin(pol.x * 10.0+time) * 0.1 * nsin(pol.x * 60.0+time + 4.5) + 
		nsin(pol.x * 4.0+time) * 0.1;
	
	
	float value = (sin(pol.x * 3.1415 * 2.0 * 3.0 + time * 1.0) * cur.y + 1.0) * 0.5;
	
	float lum = smoothstep(0, cur.x, abs(value - pol.y));
	
	vec3 colorA = vec3(0.0, 5.0, 1.0);
	vec3 colorB = vec3(0.0, 0.0, 0.0);
	
	vec3 color = mix(colorA, colorB, lum);
	
	gl_FragColor = vec4(color, 1.0);
}
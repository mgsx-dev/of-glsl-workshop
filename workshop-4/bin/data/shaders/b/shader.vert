#version 120

uniform float time;
uniform vec2 size;
uniform vec2 mouse;

varying vec3 vPos;

void main()
{
	vec2 pos = gl_Vertex.xy / 1000.0 + 0.5;
	
	float freq = 200.0;
	float scale = 30.0;
	float phase = time * 3.0;

	float height = 0.5 * (sin(pos.x * freq + phase) + sin(pos.y * freq + phase));

	vPos = vec3(pos, height);

	vec4 finalVertex = vec4(gl_Vertex.x, gl_Vertex.y, height * scale, gl_Vertex.w);

	gl_Position = gl_ModelViewProjectionMatrix * finalVertex;
}